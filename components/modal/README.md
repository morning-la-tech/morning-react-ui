# Modal Component
The Modal component is a versatile, customizable modal/dialog box implementation for React applications. It utilizes React portals to render modals directly into the body of the document outside the DOM hierarchy of the parent component, ensuring proper layering and positioning.

## Usage
To use the Modal component, you need to manage its visibility through a state in the parent component that triggers its display. Here's a simple example of how to integrate the Modal into a React component:

```jsx
import React, { useState } from 'react';
import Modal from './components/Modal';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Open Modal</button>
        <Modal
          isShowing={isModalOpen}
          hide={() => setModalOpen(false)}
          top="20%" // Optional: Adjust the vertical position of the modal
        >
          <p>This is a modal!</p>
        </Modal>
    </div>
  );
}

export default App;
```

## Props
The following props are used to control the Modal's behavior:

- children (ReactNode): The content to be displayed inside the modal.
- isShowing (boolean): Controls the visibility of the modal.
- hide (() => void): A function to be called to close the modal, typically triggered by an event such as clicking on an overlay. 
- top (string, optional): Adjusts the vertical position of the modal. Accepts any valid CSS value for top (e.g., "50%", "100px"). Default is "50%".
- title (string, optional): Text to be displayed as the modal's title.
- hasCloseButton (boolean, optional): Determines if a close button is shown. Default is true.
- closeOnClickOutside (boolean, optional): Determines if clicking outside closes the modal. Default is true.
- size (Size, optional): Size of the modal and the close button, influenced by a predefined enum. Default is Size.m.
- className (string, optional): Additional class names for custom styling.
- buttons (ModalButtonProps[], optional): An array of button configurations to display in the modal's footer. Each button can have a label, an optional variant, and an onClick handler.

## Styling
The modal's style can be customized through modal.module.css. Default styles include centering the modal both vertically and horizontally, applying a shadow for depth, and ensuring the content is scrollable if it exceeds the modal's viewport. Adjust modal.module.css as needed to match your application's theme and requirements.

Example
Here’s an example of how to trigger a modal on a button click, with custom content and footer buttons:

```tsx
import Modal, { ModalButtonProps } from './Modal';

function MyComponent() {
  const [showModal, setShowModal] = useState(false);
  const buttons: ModalButtonProps[] = [
    { label: 'Cancel', onClick: () => setShowModal(false), variant: 'secondary' },
    { label: 'Save', onClick: () => console.log('Save clicked'), variant: 'primary' }
  ];

  return (
    <>
      <button onClick={() => setShowModal(true)}>Show Details</button>
      <Modal
        isShowing={showModal}
        hide={() => setShowModal(false)}
        title='User Information'
        hasCloseButton
        size={Size.s}
        top='10%'
        buttons={buttons}
      >
        <div style={{ padding: '20px' }}>
          <h2>Modal Title</h2>
          <p>Details about the modal content...</p>
        </div>
      </Modal>
    </>
  );
}

export default MyComponent;

```

# useModal Hook
The useModal hook is a React custom hook designed to handle the visibility of modal components, with built-in functionalities for showing and hiding modals, disabling background scroll, and handling an optional onClose callback.

## Features
- Toggle Visibility: Easily manage modal visibility with handleShowModal and hide functions.
- No-scroll: Automatically manages the scrolling of the body element when the modal is visible.
- Escape Key Handling: Listens for the 'Escape' key press to close the modal when it is visible.
- Customizable On Close Behavior: Execute custom logic when the modal is hidden through the onClose callback.

## Parameters
- onClose (() => void, optional): A callback function that is executed when the modal is closed. This can be used for cleanup or other custom actions when the modal visibility is toggled off. 
- closeOnEscape (boolean): A boolean that determines whether the modal should close when the user presses the "Escape" key. By default, this value is true.

### Return Values
The useModal hook returns an object with the following properties:

- isModalShowing (boolean): The current visibility state of the modal.
- hide (() => void): A function to hide the modal. If onClose is provided, it will be called before the modal is set to not visible.
- handleShowModal (() => void): A function to show the modal.

## Usage
Here is a basic example showing how to use the useModal to control the opening and closing of a modal, as well as managing the closure with the "Escape" key:

```tsx
import useModal from './useModal';
import Modal from './Modal';
import Button from './Button';

function App() {
  const { isModalShowing, handleShowModal, hide } = useModal(undefined, false);

  return (
    <div>
      <Button onClick={handleShowModal}>Show Modal</Button>
      <Modal
        isModalShowing={isModalShowing}
        hide={hide}
        title="Modal Title"
      >
        <p>This is modal content</p>
      </Modal>
    </div>
  );
}

export default App;
```

### Notes
- Accessibility Management: If you disable closeOnEscape, ensure to provide other accessible mechanisms for closing the modal, such as clearly indicated close buttons.
- Flexibility: closeOnEscape provides flexibility for use cases where modal closure should not be interrupted, such as during critical data entry processes.

## Handling the onClose Callback
The onClose callback is particularly useful for implementing any cleanup logic or actions that need to run when the modal closes. For example, if the modal is being used to edit data, onClose can be used to reset the edit state or refresh data from a server.

## Best Practices
Conditional Rendering: It is recommended to use conditional rendering ({isModalShowing && <Modal />}) for the modal component to optimize performance and prevent the modal from being mounted when not in use.
Accessibility Considerations: Ensure that modals are accessible, including managing focus states and adding appropriate aria attributes.
This hook offers a straightforward and effective way to manage modal dialogs in your React applications, ensuring that modals are both functional and user-friendly.
