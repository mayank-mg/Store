import React, { Component } from 'react'
import {storeProducts,detailProduct} from './data';
const ProductContext=React.createContext();

 class ProductProvider extends Component {
    state={
        products:[],
        detailProduct:detailProduct,
        cart:[],
        modalOpen:false,
        modalProduct:detailProduct,
        cartSubtotal:0,
        cartTax:0,
        cartTotal:0,
    };
componentDidMount(){
    this.setProducts();
}
setProducts=()=>{
    let tempproduct=[];
    storeProducts.forEach(item=>{
        const singleitem={...item};
        tempproduct=[...tempproduct,singleitem];
    })

    this.setState(()=>{
        return{products:tempproduct};
    })
}
getId=id=>{
  const product=this.state.products.find(item=>item.id===id) 
  return product; 
};

handleDetails=(id)=>{
    const product=this.getId(id);

    this.setState(()=>{
        return{detailProduct:product}
    })
};


addToCart=(id)=>{
    let tempproduct=[...this.state.products];
    const index=tempproduct.indexOf(this.getId(id));
    const product=tempproduct[index];
    product.inCart=true;
    product.count=1;
    const price=product.price;
    product.total=price;

    this.setState(
        ()=>{
            return{products:tempproduct,cart:[...this.state.cart,product]};
        },()=>{ this.addTotal();
        }
    );

};


openModal =id =>{
    const Product= this.getId(id);
    this.setState(()=>{
        return {modalProduct:Product, modalOpen:true}
    })
}

closeModal =()=>{
    this.setState(()=>{
        return {modalOpen:false}
    })
}


  increment=(id)=>{
    let tempcart=[...this.state.cart];
    const selectedProduct = tempcart.find(item=>item.id===id)
    const index =tempcart.indexOf(selectedProduct);
    const product=tempcart[index];
    product.count=product.count+1;
    product.total=product.count*product.price;

    this.setState(()=>{
        return {
            cart:[...tempcart]
        }
    },()=>this.addTotal())

    
  }  
  
  decrement=(id)=>{
    let tempcart=[...this.state.cart];
    const selectedProduct = tempcart.find(item=>item.id===id)
    const index =tempcart.indexOf(selectedProduct);
    const product=tempcart[index];
    product.count=product.count-1;

    if(product.count==0){  
    this.removeItem(id);
   }
    else{
    
    product.total=product.count*product.price;
    this.setState(()=>{
        return {
            cart:[...tempcart]
        }
    },()=>this.addTotal())
    }
   


    
  }  
  
  removeItem=(id)=>{
    let tempproduct=[...this.state.products];
    let tempcart=[...this.state.cart];
    tempcart=tempcart.filter(item => id !== item.id)

    const index=tempproduct.indexOf(this.getId(id));

    let removedproduct=tempproduct[index];
    removedproduct.cart=false;
    removedproduct.count=0;
    removedproduct.total=0;


    this.setState(()=>{
        return{
            cart:[...tempcart],
            products:[...tempproduct]
        };
    },
    ()=>{
        this.addTotal();this.setProducts();
    })




  }     

  
  clearCart=()=>{
   this.setState(()=>{
       return { cart:[]};
   },()=>{
        this.setProducts();
        this.addTotal();
   });
  }  

  addTotal=()=>{
      let subTotal=0;
        this.state.cart.map(item=>(subTotal+=item.total));
        const tempTax=subTotal*0.1;
        const tax=parseFloat(tempTax.toFixed(2));
        const total=subTotal+tax;
        this.setState(()=>{
            return{
                cartSubtotal:subTotal,
                cartTax:tax,
                cartTotal:total,

            }
        })
  }
render() {
        return (
            <ProductContext.Provider value={{...this.state,
            handleDetails:this.handleDetails,
            addToCart:this.addToCart,
            openModal:this.openModal,
            closeModal:this.closeModal,
            increment:this.increment,
            decrement:this.decrement,
            removeItem:this.removeItem,
            clearCart:this.clearCart,
            
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer=ProductContext.Consumer;
export {ProductProvider,ProductConsumer};
