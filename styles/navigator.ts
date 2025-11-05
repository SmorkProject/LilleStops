import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    backgroundColor: "#181818",
  },
  buttonList: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingBottom: 20,
    width: "100%",
  },
  text: {
    color: "#fff",
    margin: 5,
    borderRadius: 25,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  actif: {
    backgroundColor: "#e2001a",
  },
  inactif: {
    backgroundColor: "#2b2b2b",
  },
});