import { render, screen } from '@testing-library/react'
import Home from '@/pages/index'

describe('Home', () => {
  it('renders a single h1 heading', () => {
    render(<Home />)

    const heading = screen.getAllByRole('heading', {
      level: 1
    })

    expect(heading).toHaveLength(1)
  })
})
