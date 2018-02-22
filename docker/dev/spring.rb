# this is a hack to work around a bug in spring:
# https://github.com/rails/spring/issues/339
# There is a PR to fix it here:
# https://github.com/rails/spring/pull/546
ENV['BUNDLE_PATH'] = '/bundle'
