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
    backgroundColor: "#2b2b2b",
    padding: 20,
    borderRadius: 20,
    width: "90%",
    paddingLeft: 50,
    paddingRight: 50
  },
  blockBoxAddTitle: {
    fontSize: 25,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  blockBoxBlock: {
    backgroundColor: "#374151",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20
  },
  blockBoxBlockText: {
    fontSize: 17,
    color: "#fff"
  },
  blockBoxAddButton: {
    display: "flex",
    flexDirection: "row",
  },
  blockBoxAddButtonText: {
    color: "#fff",
    fontSize: 22,
    margin: 5,
  },
});