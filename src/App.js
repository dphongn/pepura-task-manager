import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Update document title
    document.title = 'Pepura Task Manager';
    
    // Update meta description if it exists
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'A modern task management application to organize and track your tasks efficiently.');
    }
  }, []);

  return (
    <div className="App">
      {/* ...existing code... */}
    </div>
  );
}

export default App;