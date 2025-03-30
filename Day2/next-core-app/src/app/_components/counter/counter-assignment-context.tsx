"use client"

import React, { useCallback, useContext, useReducer, useRef } from "react";

interface CounterProps {
    interval?: number;
}

interface CounterState {
    count: number;
    flag: boolean;
}

type CounterAction =
    | { type: 'INCREMENT'; payload: number }
    | { type: 'DECREMENT'; payload: number }
    | { type: 'RESET' }
    | { type: 'SETFLAG'; payload: boolean };

const initialState: CounterState = {
    count: 0,
    flag: false
};

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, count: state.count + action.payload };
        case 'DECREMENT':
            return { ...state, count: state.count - action.payload };
        case 'RESET':
            return { ...initialState };
        case 'SETFLAG':
            return { ...state, flag: action.payload };
        default:
            return state;
    }
}

// 1. Create the Context
const CounterContext = React.createContext<{
    state: CounterState;
    dispatch: React.Dispatch<CounterAction>;
} | undefined>(undefined);

// 2. Create the Provider Component
const CounterContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(counterReducer, initialState);
    return (
        <CounterContext.Provider value={{ state, dispatch }}>
            {children}
        </CounterContext.Provider>
    );
}

// 3. Create the Consumer (Custom Hook)
const useCounter = () => {
    const context = useContext(CounterContext);
    if (context === undefined) {
        throw new Error('useCounter Hook must be used within the CounterContextProvider');
    }
    return context;
}

const Counter: React.FC<CounterProps> = ({ interval = 1 }) => {
    const { state, dispatch } = useCounter();
    let clickCount = useRef<number>(0);

    const manageClickCount = useCallback(() => {
        clickCount.current++;
        if (clickCount.current > 9) {
            dispatch({ type: 'SETFLAG', payload: true });
        }
    }, []);

    const inc = useCallback(() => {
        dispatch({ type: 'INCREMENT', payload: interval });
        manageClickCount();
    }, [interval, manageClickCount]);

    const dec = useCallback(() => {
        dispatch({ type: 'DECREMENT', payload: interval });
        manageClickCount();
    }, [interval, manageClickCount]);

    const reset = useCallback(() => {
        dispatch({ type: 'RESET' });
        clickCount.current = 0;
    }, []);

    return (
        <div className="card shadow-sm border-0 rounded-4 mb-4">
            <div className="card-header text-center py-3" style={{ background: 'linear-gradient(135deg, #0dcaf0, #0d6efd)' }}>
                <h3 className="m-0 text-white fw-bold">Counter Component</h3>
                <span className="badge bg-light text-dark mt-2">Interval: {interval}</span>
            </div>
            <div className="card-body p-4">
                <div className="d-flex flex-column gap-3">
                    <div className="input-group input-group-lg">
                        <span className="input-group-text bg-light">Current Value</span>
                        <input
                            type="text"
                            className="form-control form-control-lg text-center"
                            aria-label="Counter value"
                            value={state.count}
                            readOnly
                        />
                    </div>

                    <CounterInteraction inc={inc} dec={dec} reset={reset} flag={state.flag} />
                </div>
            </div>
        </div>
    );
}

const CounterSibling: React.FC<CounterProps> = ({ interval = 1 }) => {
    const { state, dispatch } = useCounter();

    return (
        <div className="card shadow-sm border-0 rounded-4 mb-4">
            <div className="card-header text-center py-3" style={{ background: 'linear-gradient(135deg,rgb(240, 13, 17),rgb(253, 13, 125))' }}>
                <h3 className="m-0 text-white fw-bold">Counter Sibling Component</h3>
            </div>
            <div className="card-body p-4">
                <div className="d-flex flex-column gap-3">
                    <div className="input-group input-group-lg">
                        <span className="input-group-text bg-light">Current Value</span>
                        <input
                            type="text"
                            className="form-control form-control-lg text-center"
                            aria-label="Counter value"
                            value={state.count}
                            readOnly
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

interface CounterInteractionProps {
    inc: () => void;
    dec: () => void;
    reset: () => void;
    flag: boolean
}

const CounterInteraction: React.FC<CounterInteractionProps> = React.memo(function ({ inc, dec, reset, flag }) {
    console.log("Counter Interaction Rendered....");

    return (
        <>
            <div className="d-flex gap-2">
                <button onClick={inc} disabled={flag}
                    className="btn btn-lg btn-info flex-grow-1 d-flex align-items-center justify-content-center gap-2">
                    <i className="bi bi-plus-circle-fill"></i>
                    <span>Increment</span>
                </button>
                <button onClick={dec} disabled={flag}
                    className="btn btn-lg btn-info flex-grow-1 d-flex align-items-center justify-content-center gap-2">
                    <i className="bi bi-dash-circle-fill"></i>
                    <span>Decrement</span>
                </button>
            </div>

            <button onClick={reset} disabled={!flag}
                className="btn btn-lg btn-outline-secondary d-flex align-items-center justify-content-center gap-2">
                <i className="bi bi-arrow-counterclockwise"></i>
                <span>Reset</span>
            </button>
        </>
    );
});

const CounterAssignment = () => {
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8">
                    <CounterContextProvider>
                        <Counter />
                        <CounterSibling />
                    </CounterContextProvider>
                </div>
            </div>
        </div>
    );
}

export default CounterAssignment;