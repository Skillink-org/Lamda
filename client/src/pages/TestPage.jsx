import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function TestPage() {
  const { developerName } = useParams();
  const [DeveloperComponent, setDeveloperComponent] = useState(null);

  useEffect(() => {
    async function loadComponent() {
      try {
        const module = await import(`../components/tests/${developerName}.jsx`);
        setDeveloperComponent(() => module.default);
      } catch (error) {
        console.error("Component not found:", developerName, error);
        setDeveloperComponent(null);
      }
    }

    loadComponent();
  }, [developerName]);

  return (
    <div className="container mt-4">
      <h2>Test Page for {developerName}</h2>
      {DeveloperComponent ? <DeveloperComponent /> : <p>⚠ לא נמצאה קומפוננטה בשם זה.</p>}
    </div>
  );
}
