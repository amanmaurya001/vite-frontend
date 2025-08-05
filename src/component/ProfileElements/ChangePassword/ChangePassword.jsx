import React from 'react';
import './ChangePassword.css';

const ChangePassword = () => {
  return (
    <div className="secure-update-container">
      <div className="secure-update-card">
        <h2 className="secure-title">Change Your Password</h2>
        <form>
          <div className="secure-form-group">
            <label>Current Password</label>
            <input type="password" className="secure-input" placeholder="Enter current password" />
          </div>

          <div className="secure-form-group">
            <label>New Password</label>
            <input type="password" className="secure-input" placeholder="Enter new password" />
          </div>

          <div className="secure-form-group">
            <label>Confirm New Password</label>
            <input type="password" className="secure-input" placeholder="Confirm new password" />
          </div>

          <button type="submit" className="secure-submit-btn">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
