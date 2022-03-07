export class ChildNodesList<T extends VisualNode> extends Set<T> {
  get length() {
    return this.size;
  }
}

export class VisualNode extends EventTarget {
  readonly childNodes: ChildNodesList<VisualNode> = new ChildNodesList();
  protected parentNode: VisualNode | null = null;

  appendChild<T extends VisualNode>(child: T) {
    if (child instanceof VisualNode) {
      child.parentNode = this;
      this.childNodes.add(child);
    }
  }

  /** Returns node's root. */
  getRootNode() {
    let parentNode = this.parentNode;
    while (parentNode) parentNode = parentNode.parentNode;
    return parentNode || this;
  }

  removeChild<T extends VisualNode>(child: T) {
    if (this.childNodes.delete(child)) {
      child.parentNode = null;
    }
    return child;
  }
}
