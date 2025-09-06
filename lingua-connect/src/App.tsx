import React from 'react';

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">LinguaConnect</h1>
      <p className="text-lg text-gray-400">The setup is complete. Your language exchange journey starts here!</p>
      
      <div className="mt-8 p-6 border border-gray-700 rounded-lg bg-gray-800 max-w-2xl text-left">
        <h2 className="text-2xl font-semibold mb-3 text-green-400">Next Steps</h2>
        <p className="mb-4">
          To connect the application to your Firebase backend, you need to add your project's configuration to the <code className="bg-gray-700 p-1 rounded text-sm">src/firebaseConfig.ts</code> file.
        </p>
        <ol className="list-decimal list-inside space-y-2">
          <li>Go to the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Firebase Console</a>.</li>
          <li>Create a new project (or select an existing one).</li>
          <li>In your project's settings, find your web app's configuration object.</li>
          <li>Copy the configuration object and paste it into the `firebaseConfig` variable in <code className="bg-gray-700 p-1 rounded text-sm">src/firebaseConfig.ts</code>, replacing the placeholder values.</li>
        </ol>
      </div>
    </div>
  );
}

export default App;