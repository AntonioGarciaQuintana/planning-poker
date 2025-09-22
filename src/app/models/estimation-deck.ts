export class EstimationDeck {
  static fibonacci: Array<number | string> = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, '?', '☕'];

  static tShirt: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '?', '☕'];

  static getDeck(type: 'fibonacci' | 'tShirt' | 'powersOfTwo'): Array<string | number> {
    switch (type) {
      case 'fibonacci':
        return EstimationDeck.fibonacci;
      case 'tShirt':
        return EstimationDeck.tShirt;
      default:
        return EstimationDeck.fibonacci;
    }
  }
}
