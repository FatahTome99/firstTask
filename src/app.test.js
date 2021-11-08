import DashBoard from "../src/compnents/dashbord/DashBoard"
import { render, screen, fireEvent  , Simulate} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// test ("tset1 " , function(){
//     expect(true).toEqual(false)
// })

test.skip(`change Height of image 1`, async () => {
    render(<DashBoard />);
    const inputEl = screen.getByTestId("Height Image 1");
    expect(inputEl).toBeInTheDocument();
    fireEvent.change(inputEl, { target: { value: '500' } })
    expect(inputEl.value).toBe('500')
    const img1 = screen.getByTestId("imsg1");
    expect(img1.style.height).toBe('500px')
})

test.only(`change Opcity of image 1`, async () => {
    URL.createObjectURL = ( ) => "image.png";
    render(<DashBoard />);
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
  
    const uploader = screen.getByTestId('uploade img1');
    Object.defineProperty(uploader, 'files', {
        value: [file]
      })

    fireEvent.change(uploader)
    const img1 = screen.getByTestId("img1");
    expect(img1).toBeInTheDocument();
    expect(img1.src).toBe('http://localhost/image.png')

    const inputEl = screen.getByTestId("Opcity Image 1");
    expect(inputEl).toBeInTheDocument();
    fireEvent.input(inputEl, { target: { value: '5' } })
    expect(inputEl.value).toBe('5')
    expect(img1.style.opacity).toBe('0.5')

})