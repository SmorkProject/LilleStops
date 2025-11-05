import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    backgroundColor: "#000",
    height: "100%"
  },
  box: {
    margin: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: "700",
    color: "#fff",
  },
  buttonChange: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#2b2b2b",
    borderRadius: 25,
    alignItems: "center",
    marginTop: 15
  },
  buttonChangeText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5
  },
  buttonChangeNumber: {
    borderRadius: 25,
    padding: 5,
  },
  resultBoxContentInText: {
    color: "#fff",
    fontSize: 17,
  },
  resultBoxcontentInTextTop: {
    width: "70%"
  },
  noData: {
    color: "#fff",
    backgroundColor: "#2b2b2b",
    borderRadius: 10,
    marginTop: 20,
    padding: 20,
  },
  resultBox: {
    backgroundColor: "#2b2b2b",
    margin: 15,
    width: "90%",
    padding: 20,
    borderRadius: 15,
  },
  resultLine: {
    alignItems: "center",
    borderRadius: 5
  },
  resultLineText: {
    fontSize: 20,
  },
  resultBoxContentIn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  resultBoxContentInButton: {
    backgroundColor: "#374151",
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 25,
    justifyContent: "center",
  },
  resultBoxContentInButtonText: {
    color: "#fff",
    fontSize: 20,
    justifyContent: "center"
  },
  resultBoxContentIn2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  resultBoxContent1:{
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  stationName: {
    color: "#fff",
    fontSize: 17
  },
  stationCity: {
    color: "gray"
  },
  stats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
  },
  statContent: {
    display: "flex",
    backgroundColor: "#181818",
    padding: 20,
    borderRadius: 5,
    alignItems: "center"
  },
  statContentTop: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  statContentText: {
    fontSize: 17,
    color: "#fff",
    margin: 2
  },
  deleteButtonBox: {
    position: "absolute",
    right: 0,
    top: 50,
    zIndex: 1,
    backgroundColor: "#181818",
    padding: 15,
    borderRadius: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});