let mockedResponse;

export default {
	get: jest.genMockFunction().mockReturnThis(),

	mockResponse: (data) => { mockedResponse = {
		data: data
	} },

	then: jest.genMockFunction().mockImplementation((callback) => {
		callback(mockedResponse);
	})
}