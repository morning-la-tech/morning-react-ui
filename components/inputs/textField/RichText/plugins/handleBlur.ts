import { Plugin, TextSelection } from 'prosemirror-state';

function handleBlurPlugin() {
  return new Plugin({
    props: {
      handleDOMEvents: {
        blur: (view) => {
          setTimeout(() => {
            const { state, dispatch } = view;
            if (
              document.activeElement &&
              document.activeElement.tagName !== 'INPUT'
            ) {
              const selection = TextSelection.create(state.doc, 0, 0);
              dispatch(state.tr.setSelection(selection));
            }
          }, 200);
          return false;
        },
      },
    },
  });
}

export default handleBlurPlugin;
