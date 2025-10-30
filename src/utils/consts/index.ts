import { Direction } from "../../domains/types";

export const VALIDATION_CONFIG = {
    maxFileSize: 5 * 1024 * 1024,
    allowedTypes: ["image/jpeg", "image/jpg", "image/png"],
    allowedExtensions: [".jpg", ".jpeg", ".png"],
};

export const DIRECTIONS: Direction[] = ["north", "east", "south", "west"];

export const DIRECTION_DEGREES: Record<Direction, number> = {
    north: 0,
    east: 90,
    south: 180,
    west: 270,
};

export const DIRECTION_LABELS: Record<Direction, string> = {
    north: "North ↑",
    east: "East →",
    south: "South ↓",
    west: "West ←",
};
