import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  backgroundBoxAdd: {
    backgroundColor: "#00000063",
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  blockBoxAdd: {
    padding: 20,
    borderRadius: 20,
    width: "90%",
    paddingLeft: 50,
    paddingRight: 50
  },
  blockBoxAddTitle: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20,
  },
  blockBoxBlock: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 20
  },
  blockBoxBlockText: {
    fontSize: 17,
  },
  blockBoxAddButton: {
    display: "flex",
    flexDirection: "row",
  },
  blockBoxAddButtonText: {
    fontSize: 22,
    margin: 5,
  },
});