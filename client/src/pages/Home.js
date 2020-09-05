import React from 'react';

const Home = () => {

    return (
        <main className='justify-content-center text-center' style={{marginTop:'65px'}}>
            <section className="row d-block" style={{marginBottom: '80px'}}>
                <h1>Whatapot</h1>
                <h3>Let's Cook Together</h3>
            </section>
            <section className='row justify-content-around p-3'>
                <div className='col-sm-12 col-md-4 card m-3'>
                    <h4 className='card-header'>Featured Chef</h4>
                    <div className='card-body'>
                        <h5>Username Here</h5>
                        <h5>Recipe Count Here</h5>
                        <h5>Go to Profile</h5>
                    </div>
                </div>
                <div className='col-sm-12 col-md-4 card m-3'>
                    <h4 className='card-header'>Featured Recipe</h4>
                    <div className='card-body'>
                        <h5>Title: Here</h5>
                        <h5>Username Here</h5>
                        <h5>Description Here</h5>
                    </div>
                </div>
            </section>
        </main>
    )
};

export default Home;