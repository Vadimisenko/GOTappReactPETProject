import React, {Component} from 'react';
import ItemDetails, {Field} from '../itemDetails'
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class BooksPage extends Component {

    gotService =  new GotService();

    state = {
        selectedBook: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true,
        })
    }

    render() {

        if (this.state.error) {
        return <ErrorMessage/>
        }

        const itemList = (
            <ItemList onItemSelected={this.onItemSelected}
                        getData={this.gotService.getAllBooks}
                        renderItem={({name}) => name}/>
        )

        const itemDetails = (
            <ItemDetails 
            itemId={this.state.selectedBook}
            getData={this.gotService.getBook}>
                <Field field='numberOfPages' label='Number of pages'/>
                <Field field='publisher' label='Publisher'/>
                <Field field='released' label='Released'/>
            </ItemDetails>
        )

       return ( 
            <RowBlock left={itemList} right={itemDetails}/>
       )}
}
