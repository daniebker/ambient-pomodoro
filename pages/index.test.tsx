
import Home from './index'
import { isAfter } from 'date-fns'
import {render, screen, fireEvent, waitFor } from '@testing-library/react';

jest.mock('date-fns')

const mockIsAfter = isAfter as jest.MockedFunction<typeof isAfter>

describe('Home', () => {

  beforeEach(() => {
      jest.useFakeTimers()
  });
  
  afterEach(() => {
      jest.resetAllMocks()
      jest.useRealTimers()
  });

  it('renders a single h1 heading', () => {
    
    render(<Home />)

    const heading = screen.getAllByRole('heading', {
      level: 1
    })

    expect(heading).toHaveLength(1)
  })
  
  describe('when loading the page', () => {
    it('should display the start button', async () => {      
      render(<Home />)
      
      const getStartButton = () => screen.getByRole('button', { name: /Start/i})
      
      const startButton = getStartButton();
      
      expect(startButton).toBeInTheDocument()
    });   
  });
})
  
  