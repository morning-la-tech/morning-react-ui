.PHONY: init install grunt-debug up halt stop destroy down ssh rebuild update-circleci-image

#GCP + CIRCLECI

define-pod-name:
	$(eval POD_NAME := $(shell kubectl --namespace=${NAMESPACE} get pod -l name=${SERVICE} -o jsonpath="{.items[0].metadata.name}"))

delete-pod: define-pod-name
	kubectl --namespace ${NAMESPACE} delete pod $(POD_NAME)
