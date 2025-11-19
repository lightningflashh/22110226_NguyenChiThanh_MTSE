import React from 'react';

const Section = ({ title, children }) => (
  <div className="mb-16">
    <div className="mb-6">
      {title}
    </div>
    <div>
      {children}
    </div>
  </div>
);

export default Section;