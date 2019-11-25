// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Animated, Easing} from 'react-native';

import {makeStyleSheetFromTheme} from 'app/utils/theme';

const scaleExpand = 3;
const maxOpacity = 1;
const initialValue = 0;

export default class RecorderAnimation extends PureComponent {
    static propTypes = {
        theme: PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.state = {
            scale: new Animated.Value(initialValue),
            opacity: new Animated.Value(initialValue),
        };
    }

    animate = (show = true) => {
        Animated.parallel([
            Animated.timing(this.state.scale, {
                toValue: show ? scaleExpand : initialValue,
                duration: 500,
                easing: Easing.bounce,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.opacity, {
                toValue: show ? maxOpacity : initialValue,
                duration: 250,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ]).start(() => {
            this.setState({expanded: !this.state.expanded});
        });
    }

    render() {
        const {theme} = this.props;
        const {scale, opacity} = this.state;
        const style = getStyleSheet(theme);
        const animatedStyle = {
            opacity,
            transform: [{
                scale,
            }],
        };

        return (
            <Animated.View style={[style.container, animatedStyle]}/>
        );
    }
}

const getStyleSheet = makeStyleSheetFromTheme((theme) => ({
    container: {
        backgroundColor: theme.centerChannelColor,
        borderRadius: 40 / 2,
        height: 40,
        position: 'absolute',
        right: 0,
        top: 3,
        width: 40,
    },
}));