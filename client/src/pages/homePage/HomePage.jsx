//home page component
import React, { useState } from "react";
import { BookOpen, Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import styles from './HomePage.module.scss';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../../services/api';

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!isLogin) {
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
          navigate('/instructions');
        }
      } else {
        const success = await loginUser(email, password);
        if (success) {
          alert("התחברת בהצלחה!");
          navigate('/instructions');
        }
      }
    } catch (err) {
      setError("שגיאה בתהליך. נסה שוב.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles['home-page']}>
      <section className={styles['hero-section']}>
        <div className={styles['hero-content']}>
          <div className={styles['hero-text']}>
            <h2 className={styles['hero-title']}>
              גלו את סגנון
              <br />
              הלימוד המתאים לכם
            </h2>
            <div className={styles['title-underline']}></div>
            <p className={styles['hero-description']}>
              באמצעות כלים מקצועיים ומדויקים, נסייע לכם למצוא את דרך הלימוד האידיאלית עבורכם בעולם התורני
            </p>
          </div>

          <div className={styles['auth-card']}>
            <div className={styles['auth-tabs']}>
              <div 
                className={`${styles['auth-tab']} ${isLogin ? styles.active : ''}`}
                onClick={() => setIsLogin(true)}
              >
                התחברות
              </div>
              <div 
                className={`${styles['auth-tab']} ${!isLogin ? styles.active : ''}`}
                onClick={() => setIsLogin(false)}
              >
                הרשמה
              </div>
            </div>

            <form className={styles['auth-form']} onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <div className={styles['form-group']}>
                    <label className={styles['form-label']}>
                      שם פרטי
                    </label>
                    <div className={styles['input-wrapper']}>
                      <input 
                        type="text"
                        className={styles['form-input']}
                        placeholder="הזינו את שמכם הפרטי"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles['form-group']}>
                    <label className={styles['form-label']}>
                      שם משפחה
                    </label>
                    <div className={styles['input-wrapper']}>
                      <input 
                        type="text"
                        className={styles['form-input']}
                        placeholder="הזינו את שם המשפחה שלכם"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className={styles['form-group']}>
                <label className={styles['form-label']}>
                  כתובת דוא״ל
                </label>
                <div className={styles['input-wrapper']}>
                  <input 
                    type="email"
                    className={styles['form-input']}
                    placeholder="הזינו את כתובת הדוא״ל שלכם"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Mail className={styles['input-icon']} />
                </div>
              </div>

              <div className={styles['form-group']}>
                <label className={styles['form-label']}>
                  סיסמה
                </label>
                <div className={styles['input-wrapper']}>
                  <input 
                    type="password"
                    className={styles['form-input']}
                    placeholder="הזינו את הסיסמה שלכם"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Lock className={styles['input-icon']} />
                </div>
              </div>

              {!isLogin && (
                <div className={styles['form-group']}>
                  <label className={styles['form-label']}>
                    אימות סיסמה
                  </label>
                  <div className={styles['input-wrapper']}>
                    <input 
                      type="password"
                      className={styles['form-input']}
                      placeholder="הזינו את הסיסמה בשנית"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Lock className={styles['input-icon']} />
                  </div>
                </div>
              )}

              {error && <p className={styles['error-text']}>{error}</p>}

              <button 
                type="submit"
                className={styles['submit-button']}
                disabled={loading}
              >
                {loading ? (
                  "טוען..."
                ) : isLogin ? (
                  <>
                    <LogIn className={styles['button-icon']} />
                    התחברות
                  </>
                ) : (
                  <>
                    <UserPlus className={styles['button-icon']} />
                    הרשמה
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className={styles['features-section']}>
        <div className={styles['features-grid']}>
          <div className={styles['feature-item']}>
            <h3 className={styles['feature-title']}>
              מדויק ומקצועי
            </h3>
            <p className={styles['feature-description']}>
              מבוסס על מתודולוגיות מוכחות לאבחון סגנונות למידה
            </p>
          </div>
          <div className={styles['feature-item']}>
            <h3 className={styles['feature-title']}>
              מותאם אישית
            </h3>
            <p className={styles['feature-description']}>
              המלצות מפורטות המתאימות לסגנון הלימוד האישי שלכם
            </p>
          </div>
          <div className={styles['feature-item']}>
            <h3 className={styles['feature-title']}>
              קל לשימוש
            </h3>
            <p className={styles['feature-description']}>
              ממשק ידידותי ונוח המאפשר מילוי מהיר ופשוט של המבחן
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
