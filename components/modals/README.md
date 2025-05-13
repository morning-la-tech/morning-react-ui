# Modal Component

The Modal component is a versatile, customizable modal/dialog box implementation for React applications in NextJS. It utilizes React portals to render modals directly into the document body outside the DOM hierarchy of the parent component, ensuring proper layering and positioning.

## Components

The modal system consists of several interconnected components:

1. **Modal.tsx**
    - Main component for displaying a modal window
    - Features automatic centering based on content height
    - Supports custom buttons and footer content
    - Handles click outside interactions

2. **ModalForm.tsx**
    - Specialized version with an integrated form
    - Automatically handles form submission
    - Inherits all features from the base Modal component

3. **ModalHeader.tsx**
    - Displays the title and an optional close button
    - Simple and customizable header interface

## Usage

To use the Modal component, you need to manage its visibility through state in the parent component. Here's a simple example:

```tsx
import React from 'react';
import Modal from './components/Modal';
import useModal from './hooks/useModal';

function App() {
  const { isModalShowing, handleShowModal, hideModal } = useModal();

  return (
    <div>
      <button onClick={handleShowModal}>Open Modal</button>
      <Modal
        isModalShowing={isModalShowing}
        hide={hideModal}
        title="Modal Title"
      >
        <p>This is modal content!</p>
      </Modal>
    </div>
  );
}

export default App;
```

For forms, you can use the specialized ModalForm component:

```tsx
import React from 'react';
import ModalForm from './components/ModalForm';
import useModal from './hooks/useModal';

function FormExample() {
  const { isModalShowing, handleShowModal, hideModal } = useModal();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form processing logic
    hideModal();
  };
  
  return (
    <>
      <button onClick={handleShowModal}>Open Form</button>
      <ModalForm
        isModalShowing={isModalShowing}
        hide={hideModal}
        title="Form Modal"
        onSubmit={handleSubmit}
        buttons={[
          { label: "Cancel", onClick: hideModal },
          { label: "Submit", type: "submit", variant: "primary" }
        ]}
      >
        {/* Form fields */}
      </ModalForm>
    </>
  );
}
```

## Props

The Modal component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Content to display inside the modal |
| `isModalShowing` | boolean | - | Controls modal visibility |
| `hide` | function | - | Function to close the modal |
| `title` | string | - | Title displayed at the top |
| `top` | string \| false | '200px' | Vertical position (use false for centering) |
| `noCloseButton` | boolean | false | Hides the close button when true |
| `closeOnClickOutside` | boolean | true | Closes modal when clicking outside |
| `className` | string | - | Additional class names for custom styling |
| `autoCenterThreshold` | number | 500 | Height threshold for automatic centering |
| `footer` | ReactNode | - | Custom footer content |
| `buttons` | ButtonProps[] | [] | Array of button configurations |
| `buttonContainerStyle` | React.CSSProperties | {} | Styles for the button container |
| `maxWidth` | string | '600px' | Maximum width of the modal |

## Hooks

### useModal Hook

The useModal hook manages modal visibility with built-in functionality:

```tsx
const { isModalShowing, hideModal, handleShowModal, toggleModal } = useModal(onClose, closeOnEscape);
```

**Parameters:**
- `onClose` (optional): Callback function executed when the modal is closed
- `closeOnEscape` (boolean, default: true): Determines if the Escape key closes the modal

**Returns:**
- `isModalShowing` (boolean): Current visibility state
- `hideModal` (function): Hides the modal and calls onClose if provided
- `handleShowModal` (function): Shows the modal
- `toggleModal` (function): Toggles modal visibility

### useModals Hook

The useModals hook handles click detection for closing the modal when clicking outside:

```tsx
const { handleMouseDown, handleMouseUp } = useModals(closeOnClickOutside, hide);
```

## Styling

The modal is styled using CSS modules with the following key features:

- Fixed overlay with semi-transparent background
- Flexible modal sizing with maximum constraints (80vh height, 90vw width)
- Custom scrollbar styling for content overflow
- Responsive positioning with automatic centering
- Box shadow and rounded corners for modern appearance

CSS variables are used for colors and shadows to maintain consistent theming.

## Accessibility Features

- Keyboard support (Escape key closing)
- Scroll locking on body when modal is open
- Focus management
- Proper z-indexing for stacking contexts

## Notes

- The modal uses ResizeObserver to detect content height changes and adjust centering accordingly.
- When the modal is open, a `no-scroll` class is added to the body to prevent background scrolling.
- The modal is rendered using React's createPortal to ensure proper stacking context.
- The `autoCenterThreshold` prop lets you configure when the modal should automatically center based on its content height.

## Handling the onClose Callback

The onClose callback is particularly useful for implementing any cleanup logic or actions that need to run when the modal closes. For example, if the modal is being used to edit data, onClose can be used to reset the edit state or refresh data from a server.

```tsx
const { isModalShowing, hideModal, handleShowModal } = useModal(() => {
  // Clean up resources or reset state when modal closes
  resetForm();
  fetchLatestData();
});
```

## Best Practices

- **Conditional Rendering**: It is recommended to use conditional rendering for the modal component to optimize performance, but the Modal component already handles this internally.
- **Accessibility Considerations**: Ensure that modals are accessible, including managing focus states and adding appropriate aria attributes.
- **Form Validation**: When using ModalForm, implement proper form validation before closing the modal.
- **Responsive Design**: Although the modal is designed to be responsive, test it on various screen sizes to ensure proper display.
- **Button Ordering**: Place the primary action button on the right and the secondary/cancel button on the left in the modal footer.
