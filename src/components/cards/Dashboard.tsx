import React from 'react';

interface DashboardProps {
  widgets?: { id: string; content: string }[];
}

const Dashboard: React.FC<DashboardProps> = ({ widgets = [] }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {widgets.length > 0 ? (
        widgets.map((widget) => (
          <div key={widget.id} className="glass p-3 rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: widget.content }} />
          </div>
        ))
      ) : (
        <>
          <div className="glass p-3 rounded-lg">Widget 1</div>
          <div className="glass p-3 rounded-lg">Widget 2</div>
          <div className="glass p-3 rounded-lg">Widget 3</div>
          <div className="glass p-3 rounded-lg">Widget 4</div>
        </>
      )}
    </div>
  );
};

export default Dashboard;