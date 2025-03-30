"use client"

import { useRef, useState } from "react";

interface CounterProps {
    interval?: number;
}

const Counter: React.FC<CounterProps> = ({ interval = 1 }) => {
    const [count, setCount] = useState<number>(0);
    const [flag, setFlag] = useState<boolean>(false);

    let clickCount = useRef<number>(0);
    // console.log(`Counter Function Executed... ${count}`);

    const manageClickCount = () => {
        clickCount.current++;
        if (clickCount.current > 9) {
            setFlag(true);
        }
    }

    const inc = () => {
        setCount((prevCount) => prevCount + interval);
        manageClickCount();
    }

    const dec = () => {
        setCount((prevCount) => prevCount - interval);
        manageClickCount();
    }

    const reset = () => {
        setCount(0);
        setFlag(false);
        clickCount.current = 0;
    }

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
                            value={count}
                            readOnly
                        />
                    </div>

                    <CounterInteraction inc={inc} dec={dec} reset={reset} flag={flag} />
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

const CounterInteraction: React.FC<CounterInteractionProps> = function ({ inc, dec, reset, flag }) {
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
}

const CounterAssignment = () => {
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8">
                    <Counter />
                    <Counter interval={10} />
                </div>
            </div>
        </div>
    );
}

export default CounterAssignment;