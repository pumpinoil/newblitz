// src/components/integrations/Form.tsx

import React from 'react';

const FormComp: React.FC = () => {
  return (
    <form className="space-y-4 p-4 text-white">
      <div>
        <label htmlFor="email" className="block">Email</label>
        <input
          type="email"
          id="email"
          className="mt-1 block w-full bg-white text-black p-2 rounded"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <button type="submit" className="bg-magickPurple text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormComp;
