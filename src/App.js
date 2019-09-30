import React from "react";

import Item from './items/item';

import "./App.css";

class App extends React.Component {

  state = {
    images: [],
    addFilterImages: [],
    active: false
  }

  componentDidMount() {
    const API_KEY = "13766038-bf8bb4564705d3805b0aac9f9";
    fetch(`https://pixabay.com/api/?key=${API_KEY}&q=color&per_page=10`)
      .then(response => response.json())
      .then(data => this.setState({ images: data.hits }) )
      .catch(err => console.log(err));
  }

  // Reset Images
  resetImages = () => {
    this.setState({ addFilterImages: this.state.images });
  }
  // filter images
  filterImages = (from, to) => {
    const filterImages = this.state.images.filter(img => {
      return img.likes > from && img.likes <= to
    })
    this.setState({ addFilterImages: filterImages });
  }
  // filter image 2000+
  filterImagesPlus = () => {
    const filterImages = this.state.images.filter(img => {
      return img.likes > 2000
  })

    this.setState({ addFilterImages: filterImages })
  }

  render() {

    const { images, addFilterImages, msg } = this.state;
    return (
      <div className="App">
        <h1>Data filtering excercise</h1>
        <p>Click on the buttons to filter number of likes:</p>


        <div id="myBtnContainer">
          <button className={'btn active'} onClick={this.resetImages}>Show all</button>
          <button className={'btn'} onClick={() => this.filterImages(0, 500)}> 0 - 500</button>
          <button className={'btn'} onClick={() => this.filterImages(500, 1000)}> 500 - 1000</button>
          <button className={'btn'} onClick={() => this.filterImages(1000, 2000)}> 1000 - 2000</button>
          <button className={'btn'} onClick={this.filterImagesPlus}> 2000 +</button>
        </div>

        <div className="img-container">

          {
            addFilterImages.map(image => {
              return (
                <Item key={image.id} image={image} />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default App;