import { ItemState } from "./View";
import { Port } from "./Port";
import Observer from "../mvvm/Observer";
import { Increment, Decrement, AddItem, RemoveItem } from "./Message";


export class QuantChanged implements Port<Increment|Decrement> {
  apply(getState: () => ItemState, setState: (state: ItemState) => void): Observer<Increment|Decrement> {
    return {
      onMessage(m) {
        setState({
          items: getState().items.map(item => {
            if (item.id === m.id) {
              return { id: item.id, name: item.name, quantity: m.quantity }
            }
            else {
              return item;
            }
          }),
        });
      },
    };
  }
}

export class ItemAddedAdapter implements Port<AddItem> {
  apply(getState: () => ItemState, setState: (state: ItemState) => void): Observer<AddItem> {
     return {
       onMessage(m) {
         setState({
           items: getState().items.concat([{
             id: getState().items.length,
             name: m.name,
             quantity: m.quantity }])
         })
       }
     }
  }
}

export class ItemDeletedAdapter implements Port<RemoveItem> {
  apply(getState: () => ItemState, setState: (state: ItemState) => void): Observer<RemoveItem> {
     return {
       onMessage(m) {
         setState({items: getState().items.filter((item)=>{item.id !== m.id}) })
       }
     }
  }
}