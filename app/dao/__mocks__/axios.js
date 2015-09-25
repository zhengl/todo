let mockedResponse;

export default {
	get: jest.genMockFunction().mockReturnThis(),

	mockResponse: (response) => { mockedResponse = response },

	then: jest.genMockFunction().mockImplementation((callback) => {
		callback({
			data: mockedResponse
		});
	})
}