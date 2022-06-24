import { waitFor, screen } from '@testing-library/dom'
import '@testing-library/jest-dom'
import layouter from '../src/layouter';

describe('Init', () => {
  it('With Nodes already in the DOM', async () => {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('mart', '40');
    myDiv.textContent = 'Simple'
    document.body.appendChild(myDiv);
    layouter();
    await waitFor(() => {
      expect(screen.getByText('Simple')).toHaveClass('mart-40')
    })
  })

  it('Adding a paragraph to the DOM', async () => {
    const paragraph = document.createElement('p');
    paragraph.setAttribute('marb', '50');
    paragraph.textContent = 'Parrafo'
    document.body.appendChild(paragraph);
    await waitFor(() => {
      expect(screen.getByText('Parrafo')).toHaveClass('marb-50')
    })
  })

  it('Adding a directive to a Node already added to the DOM', async () => {
    const myDiv = document.createElement('div');
    myDiv.textContent = 'Content'
    document.body.appendChild(myDiv);
    await waitFor(() => {
      myDiv.setAttribute('marb', '60')
      expect(screen.getByText('Content')).toHaveClass('marb-60')
    })
  })

  it('Removing a Node from the DOM', async () => {
    const myDiv = document.createElement('div');
    myDiv.textContent = 'Content'
    document.body.appendChild(myDiv);
    await waitFor(() => {
      myDiv.parentNode?.removeChild(myDiv);
      expect(myDiv).not.toBeInTheDocument();
    })
  })

  // it('Cheking if Layouter is attached in Window', () => {
  //   console.log('window layouter: ', window.layouter);
  //   expect(window).toHaveProperty('layouter');
  // })
})
