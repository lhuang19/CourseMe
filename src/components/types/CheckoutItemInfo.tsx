/**
 * 
 * CheckoutItemInfo type
 * 
 */

type CheckoutItemInfo = {
    key?: string;
    id: string;
    index: number;
    number: number;
    title: string;
    dept: string;
    delete: (id: string) => void;
    exceeded?: boolean;
    dragging?: boolean;
};

export default CheckoutItemInfo;
