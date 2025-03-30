const Counter = ({ interval = 1 }) => {
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
                        />
                    </div>
                    
                    <div className="d-flex gap-2">
                        <button className="btn btn-lg btn-info flex-grow-1 d-flex align-items-center justify-content-center gap-2">
                            <i className="bi bi-plus-circle-fill"></i>
                            <span>Increment</span>
                        </button>
                        <button 
                            className="btn btn-lg btn-info flex-grow-1 d-flex align-items-center justify-content-center gap-2">
                            <i className="bi bi-dash-circle-fill"></i>
                            <span>Decrement</span>
                        </button>
                    </div>
                    
                    <button 
                        className="btn btn-lg btn-outline-secondary d-flex align-items-center justify-content-center gap-2">
                        <i className="bi bi-arrow-counterclockwise"></i>
                        <span>Reset</span>
                    </button>
                </div>
            </div>
        </div>
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