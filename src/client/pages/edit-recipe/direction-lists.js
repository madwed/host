import React, { Component } from 'react';
import Relay from 'react-relay';
import { css } from 'glamor';

import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';

import DirectionList from './direction-list';
import Section from '../../components/section';

import {
  LIGHTEST_PRIMARY,
  LIGHTEST_TERTIARY,
} from '../../palette';

class DirectionLists extends Component {
  state = { openSet: 0 }

  openSet = (openSet) => this.setState({ openSet })

  render() {
    const { recipe } = this.props;
    const { directionSets } = recipe;
    const { openSet } = this.state;

    return (
      <div { ...styles.container }>
        <Section style={ styles.setSection }>
          <List>
            {
              directionSets.edges.map(({ node: directionSet }, index) => {
                if (index !== openSet) {
                  return (
                    <div key={ directionSet.id }>
                      { index !== 0 && <Divider/> }
                      <ListItem
                        hoverColor={ LIGHTEST_TERTIARY }
                        onClick={ () => this.openSet(index) }
                        primaryText={ directionSet.title }
                        rightIcon={ <ExpandMore style={ styles.expand }/> }
                      />
                    </div>
                  );
                }
                return (
                  <div key={ directionSet.id }>
                    { index !== 0 && <Divider/> }
                    <DirectionList
                      directionSet={ directionSet }
                      recipe={ recipe }
                    />
                  </div>
                );
              })
            }
          </List>
          <Divider/>
          <div { ...styles.sectionButton }>
            <RaisedButton label="Add Section" primary={ true }/>
          </div>
        </Section>
      </div>
    );
  }
}

const styles = {
  container: css({
    flex: 1,
  }),
  setSection: css({
    padding: '0em',
  }),
  sectionButton: css({
    padding: '0.5em 1em 1em',
    display: 'flex',
    justifyContent: 'center',
  }),
  expand: {
    right: '0em',
  },
};

export default Relay.createContainer(DirectionLists, {
  fragments: {
    recipe: () => Relay.QL`
      fragment on Recipe {
        directionSets(first: 100) {
          edges {
            node {
              id
              title
              ${DirectionList.getFragment('directionSet')}
            }
          }
        }
      }
    `,
  },
});
