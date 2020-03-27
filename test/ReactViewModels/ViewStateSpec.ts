import Terria from "../../lib/Models/Terria";
import ViewState from "../../lib/ReactViewModels/ViewState";
import RollbarErrorProvider from "../../lib/Models/RollbarErrorProvider";
import SimpleCatalogItem from "../Helpers/SimpleCatalogItem";

describe("ViewState", function() {
  let terria: Terria;
  let viewState: ViewState;

  beforeEach(function() {
    terria = new Terria();
    viewState = new ViewState({
      terria,
      catalogSearchProvider: undefined,
      locationSearchProviders: []
    });
  });

  describe("removeModelReferences", function() {
    it("unsets the previewedItem if it matches the model", function() {
      const item = new SimpleCatalogItem("testId", terria);
      viewState.previewedItem = item;
      viewState.removeModelReferences(item);
      expect(viewState.previewedItem).toBeUndefined();
    });

    it("unsets the userDataPreviewedItem if it matches the model", function() {
      const item = new SimpleCatalogItem("testId", terria);
      viewState.userDataPreviewedItem = item;
      viewState.removeModelReferences(item);
      expect(viewState.userDataPreviewedItem).toBeUndefined();
    });
  });

  describe("error provider", function() {
    it("creates an empty error provider by default", function() {
      expect(viewState.errorProvider).toBeNull();
    });

    it("can create an error provider with rollbar", function() {
      terria.configParameters.rollbarAccessToken = "123";
      viewState.errorProvider = new RollbarErrorProvider({
        terria: viewState.terria
      });
      expect(viewState.errorProvider).toBeDefined();
      expect(viewState.errorProvider.errorProvider).toBeDefined();
    });
  });
});
