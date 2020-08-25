import React, { Component } from 'react'
import {ProductConsumer} from'../context';
import {Link} from 'react-router-dom';
import {ButtonContainer} from './Button';
export class Details extends Component {
    render() {
        return (
          <ProductConsumer>
              {
                  value=>{
                    const{id, company,img,info,price,title,inCart}=value.detailProduct;


                    return(
                        <div className="container py-5">
                            <div className="row">
                                {/* title */}
                                <div className="col-10 mx-auto text-center  text-slanted text-blue my-5">
                                    <h2>{title}</h2>
                                </div>
                            </div>
                                {/* end title */}
                                  {/* Product info */}
                                  <div className="row">
                                      <div className="col-10 mx-auto col-md-6 my-3 ">   
                                        <img src={img } className="img-fluid" alt="Product"/>
                                      </div>
                                       {/* Product Text */}
                                      <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                          <h1>Model :{title}</h1>
                                          <h4 className="text-title text-uppercase mt-3 mb-2 text-muted">
                                              Made By:<span text-uppercase>{company}</span>
                                          </h4>
                                          <h4>
                                              <strong>
                                                  price:<span>$</span>{price}
                                              </strong>
                                          </h4>
                                        <p  className="text-capitalize font-weight-bold mt-3 mb-0">
                                            some info about product:</p>
                                            <p className="text-muted lead">
                                                {info}x
                                        </p>
                                        {/*buton */}
                                             <div>
                                                <Link to="/">
                                                <ButtonContainer> Back to products</ButtonContainer>
                                                </Link>
                                                <ButtonContainer cart disabled={inCart?true:false} onClick={()=>{value.addToCart(id);value.openModal(id);}}>
                                                     {inCart ? "In Cart":"Add to cart"}
                                                     </ButtonContainer>
                                                
                                            </div>
                                      </div>
                               </div>
                        </div>
                    )
                  }
              }
          </ProductConsumer>
        )
    }
}

export default Details
