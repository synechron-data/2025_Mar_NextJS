import RealisticSocketComponent from "@/app/_components/chat/realistic-chat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real-time Chat | WebSocket Demo",
  description: "Experience a real-time chat application built with Next.js and WebSockets"
}

export default function Chat() {
  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h1 className="display-6 mb-0">Real-time Chat</h1>
            <span className="badge bg-primary">WebSocket Demo</span>
          </div>
          
          <div className="card shadow-sm mb-4">
            <div className="card-body bg-light p-3">
              <p className="mb-0">
                <i className="bi bi-info-circle me-2"></i>
                This demo showcases real-time communication using WebSockets. Connect to start chatting!
              </p>
            </div>
          </div>
          
          <RealisticSocketComponent />
          
          <div className="card mt-4">
            <div className="card-header">
              <h5 className="mb-0">How It Works</h5>
            </div>
            <div className="card-body">
              <p>This chat application demonstrates real-time communication using WebSockets:</p>
              <ul>
                <li>Backend server uses a persistent WebSocket connection</li>
                <li>Messages are delivered instantly without polling</li>
                <li>Connection status is monitored and displayed</li>
              </ul>
              <p className="mb-0 text-muted">
                <small>Note: For demonstration purposes only. Messages are not stored permanently.</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}