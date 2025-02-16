import { ServerState } from "./server";
import { Position } from "./world";

export type Inventory = InventorySlot[];
export type InventorySlot
	= undefined // Empty slot
	| [number, ItemType];
export type DroppedItem = {
	type: ItemType;
	position: Position;
};
export type ItemType
	= "wood";

export function createInventory(): Inventory {
	return new Array(10)
		.fill(undefined);
}

export function dropItem(
	server: ServerState,
	type: ItemType,
	position: Position,
) {
	server.droppedItems.push({
		type,
		position,
	});
}

export function getStackableInventorySlot(
	inventory: Inventory,
	searchType: ItemType,
): number | undefined {
	for (let i = 0; i < inventory.length; i++) {
		const slotItemType = inventory[i]?.[1];

		if (slotItemType === searchType) {
			return i;
		}
	}

	return undefined;
}

export function getEmptyInventorySlot(inventory: Inventory): number | undefined {
	for (let i = 0; i < inventory.length; i++) {
		if (inventory[i] === undefined) {
			return i;
		}
	}

	return undefined;
}

