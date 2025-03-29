import { Metadata } from "next";
import styles from './settings.module.css';

export const metadata: Metadata = {
  title: "Settings Page",
  description: "Technizer India Settings"
}

export default function Settings() {
  return (
    <div className={styles.settingsContainer}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-12">
            <div className="card main-card shadow-sm mb-4">
              <div className="card-header text-white">
                <h4 className="mb-0">Application Settings</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">
                          <i className="bi bi-person-fill me-2 text-primary"></i>
                          Profile Settings
                        </h5>
                        <p className="card-text text-muted">
                          Manage your account information and preferences
                        </p>
                        <a href="#profile" className="btn btn-outline-primary">
                          Edit Profile
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">
                          <i className="bi bi-shield-lock-fill me-2 text-danger"></i>
                          Security
                        </h5>
                        <p className="card-text text-muted">
                          Manage password, 2FA, and account security
                        </p>
                        <a href="#security" className="btn btn-outline-danger">
                          Update Security
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">
                          <i className="bi bi-bell-fill me-2 text-warning"></i>
                          Notifications
                        </h5>
                        <p className="card-text text-muted">
                          Configure email and push notification preferences
                        </p>
                        <a href="#notifications" className="btn btn-outline-warning">
                          Manage Notifications
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">
                          <i className="bi bi-palette-fill me-2 text-success"></i>
                          Appearance
                        </h5>
                        <p className="card-text text-muted">
                          Customize theme, colors, and display preferences
                        </p>
                        <a href="#appearance" className="btn btn-outline-success">
                          Customize Appearance
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">
                          <i className="bi bi-puzzle-fill me-2 text-info"></i>
                          Integrations
                        </h5>
                        <p className="card-text text-muted">
                          Connect with third-party apps and services
                        </p>
                        <a href="#integrations" className="btn btn-outline-info">
                          Manage Integrations
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">
                          <i className="bi bi-sliders me-2 text-secondary"></i>
                          Advanced Settings
                        </h5>
                        <p className="card-text text-muted">
                          Configure advanced features and developer options
                        </p>
                        <a href="#advanced" className="btn btn-outline-secondary">
                          Advanced Options
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer text-end">
                <button className="btn btn-secondary me-2">Reset All Settings</button>
                <button className="btn btn-primary">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}