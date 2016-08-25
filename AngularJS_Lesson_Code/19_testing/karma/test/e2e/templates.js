describe('E2E: Views', function() {
  beforeEach(function() {
    browser().navigateTo('#/');
  });

  it('should load the home templates', function() {
    expect(
      element('#emailTable').html()
    ).toContain('tbody');
  });

  it('should not load the dashboard templates', function() {
    expect(
      element('#dashboard').count()
    ).toBe(0);
  });
});