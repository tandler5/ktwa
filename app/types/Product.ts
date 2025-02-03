export interface Product {
  id?: string
  code?: string
  description?: string
  quantity?: number
  rating?: number
  inventoryStatus?: InventoryStatus
  category?: ProductCategory
  name?: string
  image?: string
  price?: number
}

type InventoryStatus = 'SKLADEM' | 'MALÉ MNOŽSTVÍ' | 'VYPRODÁNO'

type ProductCategory = 'Příslušenství' | 'Fitness' | 'Oblečení' | 'Elektronika'
