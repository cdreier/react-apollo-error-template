import {connect} from 'react-redux'
import { gql, graphql } from 'react-apollo'
import ListingComponent from './ListingComponent'

const mapState = state => ({})
const bindDispatch = {}
const connectedList = connect(mapState, bindDispatch)(ListingComponent)

const QUERY = gql`query getPeople($page: Int!){
  people(page: $page) {
    id
    name
  }
}`

let pageNumber = 0

const withGqlData = graphql(QUERY, {
  options: () => {
    return {
      variables: {
        page: pageNumber,
      },
    }
  },
  props: (debug) => {

    return {
      loading: debug.data.loading,
      people: debug.data.people,
      loadMore: () => {
        return debug.data.fetchMore({
          variables: {
            page: ++pageNumber,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) { 
              return previousResult 
            }

            const newList = [
              ...previousResult.people,
              ...fetchMoreResult.people,
            ]
            
            // at this point, everything is fine, the newList has correct and extended data
            console.log('MORE RESULTS, RETURN NEW LIST', newList.length)
            return Object.assign({}, previousResult, {
              people: newList,
            })
          },
        })
      },
    }
  },
})

export default withGqlData(connectedList)