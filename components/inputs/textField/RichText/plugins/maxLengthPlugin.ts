import { Plugin } from 'prosemirror-state';
import { Step } from 'prosemirror-transform';

function maxLengthPlugin(maxChars: number) {
  return new Plugin({
    appendTransaction(transactions, oldState, newState) {
      let charCount = 0;
      newState.doc.descendants((node) => {
        if (node.isText && node.text?.length) {
          charCount += node?.text?.length;
        }
      });
      if (charCount > maxChars) {
        const transaction = newState.tr;

        const invertedSteps: Step[] = [];
        transactions.forEach((tr) => {
          tr.steps.forEach((step) => {
            invertedSteps.push(step.invert(tr.docs[0]));
          });
        });
        invertedSteps.reverse().forEach((step) => {
          transaction.step(step);
        });
        transaction.setMeta('addToHistory', false);

        return transaction;
      }
      return null;
    },
  });
}

export default maxLengthPlugin;
