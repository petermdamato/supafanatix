import React from 'react';
import './NavigationPane.css'

const NavigationPane = () => {
  // Dummy data for navigation options (replace this with your data)
  const navigationOptions = [
    { id: 1, label: 'Home', icon: 'home' },
    { id: 2, label: 'Explore', icon: 'explore' },
    { id: 3, label: 'Favorites', icon: 'favorite' },
    // Add more navigation options here...
  ];

  const handleNavigationClick = (navigationOption) => {
    // Handle what should happen when a navigation option is clicked
    // You can update the state or perform other actions here
  };

  return (
    <div className="navigation-pane">
      <ul className="navigation-list">
        {navigationOptions.map((option) => (
          <li key={option.id} onClick={() => handleNavigationClick(option)}>
            <span className="icon">{option.icon}</span>
            <span className="label">{option.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavigationPane;