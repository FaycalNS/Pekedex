export function formatPokemonId(id: number): string {
  return `#${id.toString().padStart(3, "0")}`;
}

export function formatPokemonName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}
