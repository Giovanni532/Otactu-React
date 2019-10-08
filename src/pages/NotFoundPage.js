import React from 'react';
import { Link } from 'react-router-dom';

export default class NotFoundPage extends React.Component {
  render() {
    return <div>
      <p style={{ textAlign: "center" }}>
        <p>404 | pages not found</p>
        <Link to="/">Go to Home </Link>
      </p>
    </div>;
  }
}