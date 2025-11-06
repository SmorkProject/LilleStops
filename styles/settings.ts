import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  box: {
    margin: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: "700",
  },
  themeBox: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 25,
    padding: 20,
    marginTop: 20,
    borderColor: "none"
  },
  title2: {
    fontSize: 20,
    fontWeight: "700",
  },
  button: {
    width: "45%",
    borderRadius: 15,
    padding: 20,
    display: "flex",
    alignItems: "center",
  },
  buttonSelected: {
    borderColor: "#e2001a",
    borderWidth: 2,
  },
  buttonList: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  buttonText: {
    fontSize: 35,
  },
  buttonLang: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
    width: "45%",
  },
  buttonLangList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  trajetsList: {
    marginTop: 10,
  },
  trajets: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  trajetsEmoji: {
    fontSize: 20,
  },
  trajetsButton: {
    display: "flex",
    alignItems: "center",
    marginTop: 10,
  },
  trajetsAdd: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    padding: 10,
  },
  trajetsAddText: {
    fontSize: 17,
    marginLeft: 5,
  },
  trajetsButtonDelete: {
    padding: 10,
    borderRadius: 25
  },
  langText: {
    marginLeft: 5,
  },
  trajetsInput: {
    marginLeft: 10,
    padding: 10,
    marginRight: 10,
    borderRadius: 20,
    width: "70%"
  },
});