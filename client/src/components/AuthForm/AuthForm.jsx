import React, { useState } from "react";
import "./AuthForm.scss";
import { TextField, Button, Tabs, Tab } from "@mui/material";
import { MailOutline, LockOutlined, PersonAddAlt1 } from "@mui/icons-material";
import { registerUser, loginUser } from "../../services/api";

const AuthForm = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      if (tabIndex === 0) {
        if (!firstName || !lastName) {
          setError("נא למלא שם פרטי ושם משפחה");
          return;
        }
        if (password !== confirmPassword) {
          setError("סיסמאות אינן תואמות");
          return;
        }
        const success = await registerUser(firstName, lastName, email, password);
        if (success) {
          alert("נרשמת בהצלחה!");
        }
      } else {
        const success = await loginUser(email, password);
        if (success) {
          alert("התחברת בהצלחה!");
        }
      }
    } catch (err) {
      setError("שגיאה בתהליך. נסה שוב.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <Tabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          centered
          className="auth-tabs"
        >
          <Tab label="הרשמה" />
          <Tab label="התחברות" />
        </Tabs>
        <div className="auth-form">
          {tabIndex === 0 && (
            <>
              <TextField
                label="שם פרטי"
                fullWidth
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="הזינו את שמכם הפרטי"
              />
              <TextField
                label="שם משפחה"
                fullWidth
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="הזינו את שם המשפחה שלכם"
              />
            </>
          )}
          <TextField
            label="כתובת דואל"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="הזינו את כתובת הדואל שלכם"
            InputProps={{ endAdornment: <MailOutline /> }}
          />
          <TextField
            label="סיסמה"
            fullWidth
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="הזינו את הסיסמה שלכם"
            InputProps={{ endAdornment: <LockOutlined /> }}
          />
          {tabIndex === 0 && (
            <TextField
              label="אימות סיסמה"
              fullWidth
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="הזינו את הסיסמה שנית"
              InputProps={{ endAdornment: <LockOutlined /> }}
            />
          )}
          {error && <p className="error-text">{error}</p>}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            endIcon={tabIndex === 1 ? <LockOutlined /> : <PersonAddAlt1 />}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "טוען..." : tabIndex === 1 ? "התחברות" : "הרשמה"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
