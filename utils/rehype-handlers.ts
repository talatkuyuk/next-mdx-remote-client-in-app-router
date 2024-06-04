import type { Element } from "hast";
import type { Html } from "mdast";
import type { State, Raw } from "mdast-util-to-hast";

/**
 * Turn an mdast `html` node into hast (`raw` node in dangerous mode, otherwise nothing).
 *
 * this handler will skip the react components, and
 * designed for only markdown "md" format documents in the @mdx-js/mdx
 *
 * @param {State} state
 *   Info passed around.
 * @param {Html} node
 *   mdast node.
 * @returns {Element | Raw | undefined}
 *   hast node.
 */
export function html(state: State, node: Html): Element | Raw | undefined {
  if (state.options.allowDangerousHtml) {
    // check if it is a react component name pattern, then return undefined
    const component_name = node.value.match(/<([A-Z][^\/\s>]+)/)?.[1];
    if (component_name) return;

    const result: Raw = { type: "raw", value: node.value };
    state.patch(node, result);
    return state.applyData(node, result);
  }

  return undefined;
}
