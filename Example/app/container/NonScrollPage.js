import React, {Component} from 'react'
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native'
import DragSortableView from '../widget/DragSortableView'
import {TEST_DATA, TXT} from '../data/base/BaseConstant'

const {width} = Dimensions.get('window')

const parentWidth = width - 10
const childrenWidth = 76+8
const childrenHeight = 76+8

export default class NonScrollPage extends Component{

    constructor(props) {
        super()

        this.state = {
            data: TEST_DATA,
            scrollEnabled: true,
            isEnterEdit: false,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.sort}>
                    <DragSortableView
                        dataSource={this.state.data}

                        parentWidth={parentWidth}

                        childrenWidth= {childrenWidth}
                        childrenHeight={childrenHeight}

                        onDragStart={(startIndex,endIndex)=>{
                            if (!this.state.isEnterEdit) {
                                this.setState({
                                    isEnterEdit: true
                                })
                            }
                        }}

                        onDataChange = {(data)=>{
                            // delete or add data to refresh
                            if (data.length != this.state.data.length) {
                                this.setState({
                                    data: data
                                })
                            }
                        }}
                        onClickItem={(item,index)=>{
                            if (this.state.isEnterEdit) {
                                const data = [...this.state.data]
                                data.splice(index,1)
                                this.setState({
                                    data: data
                                })
                            }
                        }}
                        renderItem={(item,index)=>{
                            return this.renderItem(item,index)
                        }}/>
                </View>
                <Text style={styles.txt}>{TXT}</Text>
            </View>
        )
    }

    renderItem(item,index) {
        if (this.state.isEnterEdit) {
            return (
                <View style={styles.item}>
                    <View style={styles.item_children}>
                        <Image
                            style={styles.item_icon}
                            source={item.icon}/>
                        <Text style={styles.txt}>{item.txt}</Text>
                    </View>
                    <Image
                        style={styles.item_delete_icon}
                        source={require('../data/img/clear.png')}
                    />
                </View>
            )
        } else {
            return (
                <View style={styles.item}>
                    <View style={styles.item_children}>
                        <Image
                            style={styles.item_icon}
                            source={item.icon}/>
                        <Text style={styles.txt}>{item.txt}</Text>
                    </View>
                </View>
            )
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    txt: {
        fontSize: 18,
        lineHeight: 24,
        padding: 5,
    },
    sort: {
        marginLeft: 10,
    },
    item: {
        width: childrenWidth,
        height: childrenHeight,
    },
    item_children: {
        width: childrenWidth-8,
        height: childrenHeight-8,
        backgroundColor: '#f0ffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 8
    },
    item_delete_icon: {
        width: 14,
        height: 14,
        position: 'absolute',
        right: 1,
        top: 1,
    },
    item_icon: {
        width: childrenWidth-4-8,
        height: childrenHeight-4-8,
        resizeMode: 'contain',
        position: 'absolute'
    }
})