import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByTestId(/learn react/i);
    expect(linkElement).not.toBeInTheDocument();
  });
});
