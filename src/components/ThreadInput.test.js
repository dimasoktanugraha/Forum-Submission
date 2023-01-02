/**
 * skenario testing
 *
 * - ThreadInput component
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle Isi Diskusi typing correctly
 *   - should call buat function when buat button is clicked
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThreadInput from './ThreadInput';

import '@testing-library/jest-dom';

describe('ThreadInput component', () => {
  it('should handle title typing correctly', async () => {
    // Arrange
    render(<ThreadInput thread={() => {}} />);
    const titleInput = await screen.getByPlaceholderText('Title');

    // Action
    await userEvent.type(titleInput, 'titletest');

    // Assert
    expect(titleInput).toHaveValue('titletest');
  });

  it('should handle category typing correctly', async () => {
    // Arrange
    render(<ThreadInput thread={() => {}} />);
    const categoryInput = await screen.getByPlaceholderText('Category');

    // Action
    await userEvent.type(categoryInput, 'categorytest');

    // Assert
    expect(categoryInput).toHaveValue('categorytest');
  });

  it('should handle Isi Diskusi typing correctly', async () => {
    // Arrange
    render(<ThreadInput thread={() => {}} />);
    const discussionInput = await screen.getByPlaceholderText('Isi Diskusi');

    // Action
    await userEvent.type(discussionInput, 'diskusitest');

    // Assert
    expect(discussionInput).toHaveValue('diskusitest');
  });

  it('should call buat function when buat button is clicked', async () => {
    // Arrange
    const mockRegister = jest.fn();
    render(<ThreadInput thread={mockRegister} />);
    const titleInput = await screen.getByPlaceholderText('Title');
    await userEvent.type(titleInput, 'titletest');
    const categoryInput = await screen.getByPlaceholderText('Category');
    await userEvent.type(categoryInput, 'categorytest');
    const discussionInput = await screen.getByPlaceholderText('Isi Diskusi');
    await userEvent.type(discussionInput, 'diskusitest');
    const createButton = await screen.getByRole('button', { name: 'Buat' });

    // Action
    await userEvent.click(createButton);

    // Assert
    expect(mockRegister).toBeCalledWith({
      title: 'titletest',
      body: 'diskusitest',
      category: 'categorytest',
    });
  });
});
